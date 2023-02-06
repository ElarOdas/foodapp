# Food App

## What is the project for?

This project is a test for my upcoming [master thesis project](). The project builds a
food app using a nginx Gateway, React Frontend, go backend and a postgres database dockerized in a compose structure.
As this is a test project it is intended that only I will use this project.
The goal is to test the implementations of all parts mentioned above starting the actual thesis project.
To achieve this goal I use knowledge from [Stephen Grider's Docker Course](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/) and [Maximilian Schwarzmüller's React Course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).

## How to install the project?

To start the project you first need to create secrets. Currently a secret generation function is not provided. After generating the secret run the following command.

```bash
docker compose -f compose-dev.yaml up
```

## How to use the project?

The client is accessible on **localhost:3050**. The remaining services are accessible through docker.
The frontend client runs in dev mode as such it is possible to make live changes to the code.

## Testing

Testing is currently not available and not planned. If testing will be included in the future I intend to use
[compose profiles](https://github.com/compose-spec/compose-spec/blob/master/spec.md#profiles).

## License

MIT License

Copyright (c) [2023] [Patrick Volpert]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
