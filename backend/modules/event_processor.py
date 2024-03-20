import asyncio


async def log_loop(event_filter, handle_event, poll_interval=2):
    while True:
        for event in event_filter.get_new_entries():
            await handle_event(event)
        await asyncio.sleep(poll_interval)
