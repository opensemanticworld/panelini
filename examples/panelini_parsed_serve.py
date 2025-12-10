import argparse

from panelini import Panelini

app = Panelini()

parser = argparse.ArgumentParser(description="Serve a Panelini app.")
parser.add_argument("-p", "--port", type=int, default=5623, help="Port to serve the app on.")
args = parser.parse_args()
print(args)

app.serve(port=args.port)


# kwargs = dict(kwargs, **dict(
#     port=port, address=address, websocket_origin=websocket_origin,
#     loop=loop, show=show, start=start, title=title, verbose=verbose,
#     location=location, admin=admin
# ))
