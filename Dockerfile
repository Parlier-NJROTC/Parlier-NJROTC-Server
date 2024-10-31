FROM oven/bun
RUN apt-get update && apt-get install -y python3 python3-pip
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip install --no-cache-dir pause requests python-dotenv colorama

COPY . .
RUN bun install
CMD ["bun","run","start"]