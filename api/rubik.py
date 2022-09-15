# rubik.py
# Author: Ronald L. Rivest
# Modified: Michael Lieberman
# Last updated: October 24, 2008
# Updated for python3: Saif Masoud, September 2020
# Modified for logo on WGR: Dec 2020
# Routines to work with Rubik's 2x2x2 cube
"""
We'll call the six sides, as usual:
   Front Back   Up Down   Left Right
or F, B, U, D, L, R.

Permutations:

We'll number the cubie positions starting
at 0, front to back, up to down, left to right.
We give an alphabetic name to the cubies as well,
by listing the faces it contains, starting with
F or B, in clockwise order (looking in from outside).
   0th cubie = FLU
   1st cubie = FUR
   2nd cubie = FDL
   3rd cubie = FRD
   4th cubie = BUL
   5th cubie = BRU
   6th cubie = BLD
   7th cubie = BDR
Each cubie has three faces, so we have 24 face
positions.  We'll label them as 0 to 23, but also
with a 3-letter name that specifies the name
of the cubie it is on, cyclically rotated to
put the name of the face first (so cubie FLU
has faces flu, luf, and ufl, on sides F, L,
and U, respectively). We'll use lower case
here for clarity.  Here are the face names,
written as variables for later convenience.
We also save each number in a second variable,
where the positions are replaced by the colors that
would be there if the cube were solved and had its
orange-yellow-blue cubie in position 7, with yellow
facing down.
"""
# flu refers to the front face (because f is first) of the cubie that
# has a front face, a left face, and an upper face.
# yob refers to the colors yellow, orange, blue that are on the
# respective faces if the cube is in the solved position.
ogy = flu = 0  # (0-th cubie; front face)
gyo = luf = 1  # (0-th cubie; left face)
yog = ufl = 2  # (0-th cubie; up face)

oyb = fur = 3  # (1-st cubie; front face)
ybo = urf = 4  # (1-st cubie; up face)
boy = rfu = 5  # (1-st cubie; right face)

owg = fdl = 6  # (2-nd cubie; front face)
wgo = dlf = 7  # (2-nd cubie; down face)
gow = lfd = 8  # (2-nd cubie; left face)

obw = frd = 9  #  (3-rd cubie; front face)
bwo = rdf = 10  # (3-rd cubie; right face)
wob = dfr = 11  # (3-rd cubie; down face)

ryg = bul = 12  # (4-th cubie; back face)
ygr = ulb = 13  # (4-th cubie; up face)
gry = lbu = 14  # (4-th cubie; left face)

rby = bru = 15  # (5-th cubie; back face)
byr = rub = 16  # (5-th cubie; right face)
yrb = ubr = 17  # (5-th cubie; up face)

rgw = bld = 18  # (6-th cubie; back face)
gwr = ldb = 19  # (6-th cubie; left face)
wrg = dbl = 20  # (6-th cubie; down face)

rwb = bdr = 21  # (7-th cubie; back face)
wbr = drb = 22  # (7-th cubie; down face)
brw = rbd = 23  # (7-th cubie; right face)

three_color_to_index = {
    "ogy": 0,
    "gyo": 1,
    "yog": 2,
    "oyb": 3,
    "ybo": 4,
    "boy": 5,
    "owg": 6,
    "wgo": 7,
    "gow": 8,
    "obw": 9,
    "bwo": 10,
    "wob": 11,
    "ryg": 12,
    "ygr": 13,
    "gry": 14,
    "rby": 15,
    "byr": 16,
    "yrb": 17,
    "rgw": 18,
    "gwr": 19,
    "wrg": 20,
    "rwb": 21,
    "wbr": 22,
    "brw": 23,
}

UI_COLOR_TO_LOGICAL_NAME = {
    "yellow": "y",
    "red": "r",
    "green": "g",
    "blue": "b",
    "grey": "w",
    "orange": "o",
}

CUBIE_FACE_INDEX_TO_COLOR = {
  0: "orange", # Orange
  3: "orange",
  6: "orange",
  9: "orange",
  5: "blue", # Blue
  10: "blue",
  16: "blue",
  23: "blue",
  1: "green", # Green
  8: "green",
  14: "green",
  19: "green",
  7: "grey", # White
  11: "grey",
  20: "grey",
  22: "grey",
  2: "yellow", # Yellow
  4: "yellow",
  13: "yellow",
  17: "yellow",
  12: "red", # Red
  15: "red",
  18: "red",
  21: "red",
}

"""
A permutation p on 0,1,...,n-1 is represented as
a list of length n-1.  p[i] = j means of course
that p maps i to j.

When operating on a list c (e.g. a list of length
24 of colors), then  p * c
is the rearranged list of colors:
   (p * c)[i] = c[p[i]]    for all i
Thus, p[i] is the location of where the color of
position i will come from; p[i] = j means that
the color at position j moves to position i.
"""

####################################################
### Permutation operations
####################################################


def perm_apply(perm, position):
    """
    Apply permutation perm to a list position (e.g. of faces).
    Face in position p[i] moves to position i.
    """
    return tuple([position[i] for i in perm])


def perm_inverse(p):
    """
    Return the inverse of permutation p.
    """
    n = len(p)
    q = [0] * n
    for i in range(n):
        q[p[i]] = i
    return tuple(q)


def perm_to_string(p):
    """
    Convert p to string, slightly more compact
    than list prin(ing.
    """
    s = "("
    for x in p:
        s = s + "%2d " % x
    s += ")"
    return s


###################################################
### Make standard permutations of faces
###################################################
# Identity: equal to (0, 1, 2, ..., 23).
I = (
    flu,
    luf,
    ufl,
    fur,
    urf,
    rfu,
    fdl,
    dlf,
    lfd,
    frd,
    rdf,
    dfr,
    bul,
    ulb,
    lbu,
    bru,
    rub,
    ubr,
    bld,
    ldb,
    dbl,
    bdr,
    drb,
    rbd,
)
"""
When any of the following Rubik's cube permutations are applied, the
three faces on a cubie naturally stay together:
{0,1,2}, {3,4,5}, ..., {21,22,23}.
"""

# Front face rotated clockwise.
F = (
    fdl,
    dlf,
    lfd,
    flu,
    luf,
    ufl,
    frd,
    rdf,
    dfr,
    fur,
    urf,
    rfu,
    bul,
    ulb,
    lbu,
    bru,
    rub,
    ubr,
    bld,
    ldb,
    dbl,
    bdr,
    drb,
    rbd,
)
# Front face rotated counter-clockwise.
Fi = perm_inverse(F)

# Left face rotated clockwise.
L = (
    ulb,
    lbu,
    bul,
    fur,
    urf,
    rfu,
    ufl,
    flu,
    luf,
    frd,
    rdf,
    dfr,
    dbl,
    bld,
    ldb,
    bru,
    rub,
    ubr,
    dlf,
    lfd,
    fdl,
    bdr,
    drb,
    rbd,
)
# Left face rotated counter-clockwise.
Li = perm_inverse(L)

# Upper face rotated clockwise.
U = (
    rfu,
    fur,
    urf,
    rub,
    ubr,
    bru,
    fdl,
    dlf,
    lfd,
    frd,
    rdf,
    dfr,
    luf,
    ufl,
    flu,
    lbu,
    bul,
    ulb,
    bld,
    ldb,
    dbl,
    bdr,
    drb,
    rbd,
)
# Upper face rotated counter-clockwise.
Ui = perm_inverse(U)

# All 6 possible moves (assuming that the lower-bottom-right cubie
# stays fixed).
quarter_twists = (F, Fi, L, Li, U, Ui)

quarter_twists_names = {}
quarter_twists_names[F] = "F"
quarter_twists_names[Fi] = "Fi"
quarter_twists_names[L] = "L"
quarter_twists_names[Li] = "Li"
quarter_twists_names[U] = "U"
quarter_twists_names[Ui] = "Ui"

# Names to permutation
names_quarter_twists = {}
names_quarter_twists["F"] = F
names_quarter_twists["Fi"] = Fi
names_quarter_twists["L"] = L
names_quarter_twists["Li"] = Li
names_quarter_twists["U"] = U
names_quarter_twists["Ui"] = Ui


def input_configuration():
    """
    Prompts a user to input the current configuration of the cube, and
    translates that into a permutation.
    """
    position = [-1] * 24

    cubie = input(
        """
    Look for the cubie with yellow, blue, and orange faces (it has the
    Rubiks mark). Put this cubie in the lower-back-right corner with
    the yellow face down. We will call this cubie #7.

    Now look at the cubie in the upper-front-left corner. We will call
    this cubie #0. Starting with its front face, and going clockwise,
    input the colors of the faces (e.g. yob, if the colors are yellow,
    orange, and blue):
    cubie #0: """
    )
    position[0] = eval(cubie)
    position[1] = eval(cubie[1:] + cubie[0])
    position[2] = eval(cubie[2] + cubie[:2])
    cubie = input(
        """
    Now enter cubie #1, which is to the right of cubie #0, again
    starting with the front face and going clockwise:
    cubie #1: """
    )
    position[3] = eval(cubie)
    position[4] = eval(cubie[1:] + cubie[0])
    position[5] = eval(cubie[2] + cubie[:2])
    cubie = input(
        """
    Now enter cubie #2, which is beneath cubie #0:
    cubie #2: """
    )
    position[6] = eval(cubie)
    position[7] = eval(cubie[1:] + cubie[0])
    position[8] = eval(cubie[2] + cubie[:2])
    cubie = input(
        """
    Now enter cubie #3, to the right of cubie #2:
    cubie #3: """
    )
    position[9] = eval(cubie)
    position[10] = eval(cubie[1:] + cubie[0])
    position[11] = eval(cubie[2] + cubie[:2])
    cubie = input(
        """
    Now enter cubie #4, which is behind cubie #0. Start with the back
    face, and go clockwise:
    cubie #4: """
    )
    position[12] = eval(cubie)
    position[13] = eval(cubie[1:] + cubie[0])
    position[14] = eval(cubie[2] + cubie[:2])
    cubie = input(
        """
    Now enter cubie #5, which is to the right of cubie #4:
    cubie #5: """
    )
    position[15] = eval(cubie)
    position[16] = eval(cubie[1:] + cubie[0])
    position[17] = eval(cubie[2] + cubie[:2])
    cubie = input(
        """
    Now enter cubie #6, which is beneath cubie #4:
    cubie #6: """
    )
    position[18] = eval(cubie)
    position[19] = eval(cubie[1:] + cubie[0])
    position[20] = eval(cubie[2] + cubie[:2])
    print("""We already know cubie #7, so we're done.""")
    cubie = "oyb"
    position[21] = eval(cubie)
    position[22] = eval(cubie[1:] + cubie[0])
    position[23] = eval(cubie[2] + cubie[:2])

    return tuple(position)


if __name__ == "__main__":
    input_configuration()
