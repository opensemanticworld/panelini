import argparse
import sys
from inspect import _empty, signature

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

_DESCRIPTION = """\
Reimplementation of the 'panel' comand line tool without serving capabilities.
API serve: https://panel.holoviz.org/api/panel.io.server.html
Docs basic_auth: https://panel.holoviz.org/how_to/authentication/basic.html
"""


def _get_panel_serve_args() -> dict:
    """Get the parameters of panel.io.server.serve function."""
    args: dict = {}
    serve_signature = signature(panel_serve)
    skip = ["panels", "kwargs"]
    for name, param in serve_signature.parameters.items():
        if name in skip:
            continue
        cli_name = f"--{name.replace('_', '-')}"

        if param.default is _empty:
            arg_type = str
            default = None
        else:
            default = param.default
            arg_type = type(default)

        if arg_type is bool:
            if default is False:
                args[cli_name] = {"action": "store_true", "help": f"(default: {default})"}
            else:
                args[cli_name] = {"action": "store_false", "help": f"(default: {default})"}
        else:
            args[cli_name] = {"type": arg_type, "default": default, "help": f"(default: {default})"}

    return args


def _remove_none_and_invoke(parsed_args: argparse.Namespace) -> argparse.Namespace:
    """Remove invoke from parsed_args"""
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
        # TODO: find out place to inject additional / merge existing params for panel_serve
        commands.append(extra)
        subparser = subs.add_parser(extra.name, help=extra.help)
        if serve_via_python and extra is Serve:
            serve_args = _get_panel_serve_args()
            print(f"subparser.args\n{serve_args}\n")

        subcommand = extra(parser=subparser)
        subparser.set_defaults(invoke=subcommand.invoke)

    return parser, commands


def get_parsed_args(args: list[str] | None = None, serve_via_python: bool = False) -> argparse.Namespace:
    """Parse valid command line arguments and return the parsed arguments as dictionary."""
    parser, commands = _build_parser(serve_via_python=serve_via_python)
    # print(f"parser:\n{parser}\n")
    # print(f"commands:\n{commands}\n")
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


if __name__ == "__main__":
    """Run the panel serve command with parsed arguments."""
    from panelini import Panelini

    app = Panelini()
    # Set static serve arg at first position after script name
    sys.argv.insert(1, "serve")
    # print(f"\nsys.argv before parsing:\n{sys.argv}\n")
    parsed_args = get_parsed_args(args=sys.argv, serve_via_python=True)
    print(f"\nparsed_args:\n{parsed_args}\n")
    # app.serve(**vars(parsed_args))
    serve_args = _get_panel_serve_args()
    print(f"\nserve_args:\n{serve_args}\n")
