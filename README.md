# rubiks-2d-react: A 2D Rubik's Cube Solver
![Alt text](/rubiks-2d-react-gif.gif?raw=true "Demo")

## Clone The Project:
```bash
git clone https://github.com/madelesi/rubiks-2d-react.git
```
## Install Using Docker:
Build Image:
```bash
sudo docker build -f Dockerfile -t rubiks-react-flask-2d .
```
To run the image (Replace the first '5000' with whatever port you wish to run the container on):
```bash
sudo docker run --rm -p 5000:5000 rubiks-react-flask-2d:latest
```

## Install using npm & pip:
```bash
npm install
cd api
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
cd ..
```
To run:
```bash
npm run run-both
```

## License
[MIT](https://choosealicense.com/licenses/mit/)