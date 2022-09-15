from flask import Flask, request, app
import rubik
from bidirectinoal_bfs import bidirectional_bfs_search, rubik_list_states

app = Flask(__name__)


@app.route("/api", methods=["POST"])
def index():
    colors = request.json.get('colors_list')
    try:
        perm = ui_color_arr_to_permutation(colors)
        twists = bidirectional_bfs_search(perm)
        twist_names = [
            rubik.quarter_twists_names[t]
            for t in twists
        ]
        rubiks_positions_list = rubik_list_states(perm, twists)
        colors_lists = [[rubik.CUBIE_FACE_INDEX_TO_COLOR[face_index] for face_index in config] for config in rubiks_positions_list]
        return {"rubik_configs": rubiks_positions_list, "twists": twist_names, 'colors_lists': colors_lists}
    except KeyError:  # invalid rubik's input
        return {}


def ui_color_arr_to_permutation(rgb_arr):
    perm = []
    if len(rgb_arr) != 24:
        raise ValueError(
            "Input must be 24 colors  ['red, yellow, ...']")
    for i in range(0, 24, 3):
        col_string = ""  # For example: 'rgw'
        for j in range(i, i + 3):
            col_string += rubik.UI_COLOR_TO_LOGICAL_NAME[rgb_arr[j]]

        perm.extend([
            rubik.three_color_to_index[col_string],
            rubik.three_color_to_index[col_string[1:] + col_string[0]],
            rubik.three_color_to_index[col_string[2] + col_string[:2]],
        ])
    return tuple(perm)


if __name__ == "__main__":
    app.debug = True
    app.run("0.0.0.0")
