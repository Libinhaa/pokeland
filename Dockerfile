FROM python:3.12-slim

WORKDIR /app

# Copy project files and static game assets
COPY . /app

# Ensure SQLite storage directory exists
RUN cp -r /app/data /app/data_defaults && mkdir -p /app/data

EXPOSE 8080
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

CMD ["python", "server.py"]
