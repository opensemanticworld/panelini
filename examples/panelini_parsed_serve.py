import argparse
import sys

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

from panelini import Panelini

app = Panelini()

_DESCRIPTION = """\
Reimplementation of the 'panel' comand line tool without serving capabilities.
"""


def main(args: list[str] | None = None) -> argparse.Namespace:
    from bokeh.command.subcommands import all as bokeh_commands

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

    # TODO: First try only using Serve
    # for extra in Serve:
    for extra in (Bundle, Compile, Convert, OAuthSecret, Serve):
        commands.append(extra)
        subparser = subs.add_parser(extra.name, help=extra.help)
        subcommand = extra(parser=subparser)
        subparser.set_defaults(invoke=subcommand.invoke)

    if len(sys.argv) == 1:
        all_commands = sorted([c.name for c in commands])
        die(f"ERROR: Must specify subcommand, one of: {nice_join(all_commands)}")
    elif len(sys.argv) > 1 and any(sys.argv[1] == c.name for c in commands):
        sys.argv = transform_cmds(sys.argv)

        # TODO: First try only using serve
        # if sys.argv[1] in ("serve"):
        if sys.argv[1] in ("bundle", "compile", "convert", "serve", "oauth-secret", "help"):
            parsed_args = parser.parse_args(sys.argv[1:])
            try:
                # ret = parsed_args.invoke(parsed_args)
                return parsed_args
            except Exception as e:
                if config.autoreload or config.log_level in ("DEBUG", "INFO"):
                    raise
                die("ERROR: " + str(e))
        else:
            # ret = bokeh_entry_point()
            return parsed_args
    else:
        parser.parse_args(sys.argv[1:])
        sys.exit(1)

    # if ret is False:
    #     sys.exit(1)
    # elif ret is not True and isinstance(ret, int) and ret != 0:
    #     sys.exit(ret)


parsed_args = main(sys.argv)
# remove from parsed_args: invoke=<bound method Serve.invoke of <panel.command.serve.Serve object at 0x7fdbb82e9f40>>

# remove invoke from parsed_args
remove_attr_list = ["invoke", "static_dirs", "ico_path", "title"]

for attr in remove_attr_list:
    if hasattr(parsed_args, attr):
        delattr(parsed_args, attr)


cli_kwargs = {k: v for k, v in vars(parsed_args).items() if v is not None}
print(f"Serving with args: {cli_kwargs}")
# panel.io.server.serve(app, title="Panelini", **cli_kwargs)
app.serve(**cli_kwargs)

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


# def _build_serve_parser(skip=None) -> argparse.ArgumentParser:
#     """ "
#     Build an argument parser for the Panel serve function.
#     """

#     if skip is None:
#         skip = {"panel", "title", "ico_path", "static_dirs"}
#     parser = argparse.ArgumentParser(description="Serve Panel app")
#     sig = signature(panel.io.server.serve)
#     print(sig.parameters)

#     # Params you *already* set explicitly in your wrapper

#     for name, param in sig.parameters.items():
#         if name in skip:
#             continue

#         cli_name = f"--{name.replace('_', '-')}"
#         # Try to infer type from default
#         if param.default is _empty:
#             arg_type = str
#             default = None
#         else:
#             default = param.default
#             arg_type = type(default)

#         # Special-case bools: use flags
#         if arg_type is bool:
#             if default is False:
#                 parser.add_argument(cli_name, action="store_true", help=f"{name} (bool)")
#             else:
#                 parser.add_argument(cli_name, action="store_false", help=f"{name} (bool)")
#         else:
#             parser.add_argument(cli_name, type=arg_type, default=None, help=f"{name} ({arg_type.__name__})")

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


# # Docs basic_auth: https://panel.holoviz.org/how_to/authentication/basic.html

# # Test example
# # credentials_dict = {"admin": "admin"}
# # panel.io.server.serve(app, title="Panelini", basic_auth=credentials_dict, cookie_secret="panelini")

# # API serve: https://panel.holoviz.org/api/panel.io.server.html
# panel.io.server.serve(app, title="Panelini", **cli_kwargs)
# app.serve(**cli_kwargs)
