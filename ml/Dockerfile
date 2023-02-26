FROM python:3.8.0

WORKDIR /user/src/app

COPY './requirement.txt' .

RUN pip install -r requirement.txt

COPY . .

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]

ENTRYPOINT [ "python", "app.py" ]
