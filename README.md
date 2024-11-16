## Getting Started

1. Create a virtal environment (backend) and install the dependencies:

```bash
python3 -m venv .venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Install npm (frontend) dependencies:

```bash
yarn
```

3. Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).


