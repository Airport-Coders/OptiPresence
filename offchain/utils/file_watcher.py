import os
import asyncio


async def wait_for_file(file_path):
    while not os.path.exists(file_path):
        print(f"Waiting for file {file_path} to exist...")
        await asyncio.sleep(1)
    print(f"File {file_path} found!")
