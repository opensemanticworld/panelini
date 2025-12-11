import argparse
import sys
from inspect import signature

from bokeh.command.subcommands import all as bokeh_commands
from bokeh.command.subcommands.serve import Serve as BkServe
from bokeh.command.util import die
from bokeh.util.strings import nice_join
from panel import __version__
from panel.command import transform_cmds
from panel.command.bundle import Bundle
from panel.command.compile import Compile
from panel.command.convert import Convert
from panel.command.oauth_secret import OAuthSecret
from panel.command.serve import Serve
from panel.config import config
from panel.io.server import serve as panel_serve

from panelini import Panelini

app = Panelini()

_DESCRIPTION = """\
Reimplementation of the 'panel' comand line tool without serving capabilities.
API serve: https://panel.holoviz.org/api/panel.io.server.html
Docs basic_auth: https://panel.holoviz.org/how_to/authentication/basic.html
"""


def _remove_none_and_invoke(parsed_args):
    # remove invoke from parsed_args
    if "invoke" in parsed_args:
        delattr(parsed_args, "invoke")
    # Clear none values
    for key in list(vars(parsed_args).keys()):
        if getattr(parsed_args, key) is None:
            delattr(parsed_args, key)
    return parsed_args


def _build_parser(serve_via_python: bool = False) -> tuple[argparse.ArgumentParser, list]:
    """
    Build the argument parser for the CLI.
    Additional serve commands allowed when serve app via panel function in python.
    """
    parser = argparse.ArgumentParser(
        prog="panel",
        epilog="See '<command> --help' to read about a specific subcommand.",
        description=_DESCRIPTION,
        formatter_class=argparse.RawTextHelpFormatter,
    )
    parser.add_argument("-v", "--version", action="version", version=__version__)
    subs = parser.add_subparsers(help="Sub-commands")

    commands = list(bokeh_commands)
    for command in commands:
        if command is not BkServe:
            subs.add_parser(command.name, help=command.help)

    for extra in (Bundle, Compile, Convert, OAuthSecret, Serve):
        if serve_via_python and extra is Serve:
            serve_signature = signature(panel_serve)
            serve_params = serve_signature.parameters
            print(f"\nserve_params: {serve_params}\n")
        commands.append(extra)
        subparser = subs.add_parser(extra.name, help=extra.help)
        subcommand = extra(parser=subparser)
        subparser.set_defaults(invoke=subcommand.invoke)
    return parser, commands


def get_parsed_args(args: list[str] | None = None, serve_via_panel: bool = False) -> argparse.Namespace:
    """Parse valid command line arguments and return the parsed arguments as dictionary."""
    parser, commands = _build_parser(serve_via_python=serve_via_panel)
    print(f"parser:\n{parser}\n")
    print(f"commands:\n{commands}\n")
    argv = sys.argv if args is None else args

    if len(argv) == 1:
        all_commands = sorted([c.name for c in commands])
        die(f"ERROR: Must specify subcommand, one of: {nice_join(all_commands)}")

    if len(argv) > 1 and any(argv[1] == c.name for c in commands):
        argv = transform_cmds(argv)
        if argv[1] in ("bundle", "compile", "convert", "serve", "oauth-secret", "help"):
            parsed_args = parser.parse_args(argv[1:])
            parsed_args = _remove_none_and_invoke(parsed_args)
            try:
                return parsed_args
            except Exception as e:
                if config.autoreload or config.log_level in ("DEBUG", "INFO"):
                    raise
                die("ERROR: " + str(e))
        else:
            return parser.parse_args(argv[1:])
    parser.parse_args(argv[1:])
    sys.exit(1)


# Set static serve arg at first position after script name
sys.argv.insert(1, "serve")
print(f"\nsys.argv before parsing:\n{sys.argv}\n")
parsed_args = get_parsed_args(args=sys.argv, serve_via_panel=True)
print(f"\nparsed_args:\n{parsed_args}\n")

# app.serve(**vars(parsed_args))

# # remove invoke from parsed_args
# remove_attr_list = ["invoke", "static_dirs", "ico_path", "title"]

# for attr in remove_attr_list:
#     if hasattr(parsed_args, attr):
#         delattr(parsed_args, attr)


# cli_kwargs = {k: v for k, v in vars(parsed_args).items() if v is not None}
# print(f"Serving with args: {cli_kwargs}")
# panel.io.server.serve(app, title="Panelini", **cli_kwargs)

#

# app.serve(**cli_kwargs)

# # parser = argparse.ArgumentParser(description="Serve a Panelini app.")
# # parser.add_argument("-p", "--port", type=int, default=5623, help="Port to serve the app on.")
# # args = parser.parse_args()
# # print(args)


# # def serve(**kwargs):
# #     """Serve the Panelini application."""

# #     panel.io.server.serve(app, port=args.port)


# # Utility function to retrieve function parameters
# # https://github.com/OpenSemanticLab/osw-python/blob/f273c3c7448588c2809c852865cedff11afe506a/src/osw/utils/workflow.py#L96-L102


# # print(get_func_params(panel.io.server.serve))

# # kwargs = dict(kwargs, **dict(
# #     port=port, address=address, websocket_origin=websocket_origin,
# #     loop=loop, show=show, start=start, title=title, verbose=verbose,
# #     location=location, admin=admin
# # ))


# # if __name__ == "__main__":
# #     serve()


def _build_panel_serve_parser() -> argparse.ArgumentParser:
    """ "
    Build an argument parser for the Panel serve function.
    #"""

    # parser = argparse.ArgumentParser(description="Serve Panel app")
    # sig = signature(panel_serve)
    # # remove kwargs from signature

    # print(sig.parameters)

    # # Params you *already* set explicitly in your wrapper

    # for name, param in sig.parameters.items():
    #     if name in skip:
    #         continue

    #     cli_name = f"--{name.replace('_', '-')}"
    #     # Try to infer type from default
    #     if param.default is _empty:
    #         arg_type = str
    #         default = None
    #     else:
    #         default = param.default
    #         arg_type = type(default)

    #     # Special-case bools: use flags
    #     if arg_type is bool:
    #         if default is False:
    #             parser.add_argument(cli_name, action="store_true", help=f"{name} (bool)")
    #         else:
    #             parser.add_argument(cli_name, action="store_false", help=f"{name} (bool)")
    #     else:
    #         parser.add_argument(cli_name, type=arg_type, default=None, help=f"{name} ({arg_type.__name__})")


#     return parser


# """
# The active selection is part of a Python script that handles command-line argument parsing for a Panel server application. The code first sets argv to None, which means it will default to using the arguments provided to the script via the command line. It then creates an argument parser by calling the _build_serve_parser() function. This function dynamically constructs an argparse.ArgumentParser based on the signature of the panel.io.server.serve function, skipping certain parameters that are managed elsewhere.

# The next line uses the parser to process the arguments. It calls parser.parse_known_args(), passing either the command-line arguments (sys.argv[1:]) or a custom list (argv) if provided. This method returns a tuple: the first element (ns) is a namespace object containing the parsed arguments, and the second is a list of any unrecognized arguments. This approach allows the script to flexibly handle both standard command-line usage and programmatic invocation, making it easier to test or extend.

# A subtle but important detail is the use of parse_known_args instead of parse_args. This allows the script to ignore any arguments it doesn't recognize, which can be useful if other parts of the application or external tools inject additional flags. Overall, this pattern is common in Python CLI tools, providing robust and flexible argument handling.
# """
# argv = None
# parser = _build_serve_parser()
# ns, _ = parser.parse_known_args(sys.argv[1:] if argv is None else argv)

# cli_kwargs = {k: v for k, v in vars(ns).items() if v is not None}
# print(f"Serving with args: {cli_kwargs}")


# #

# # Test example
# # credentials_dict = {"admin": "admin"}
# # panel.io.server.serve(app, title="Panelini", basic_auth=credentials_dict, cookie_secret="panelini")

# panel.io.server.serve(app, title="Panelini", **cli_kwargs)
# app.serve(**cli_kwargs)
