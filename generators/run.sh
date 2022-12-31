#!/bin/bash

exec python3 worker.py &
exec python3 gen_setup.py