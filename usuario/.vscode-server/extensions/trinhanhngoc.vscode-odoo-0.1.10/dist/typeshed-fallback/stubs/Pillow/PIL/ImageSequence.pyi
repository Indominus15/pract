from _typeshed import Incomplete
from typing import Any

class Iterator:
    im: Any
    position: Any
    def __init__(self, im) -> None: ...
    def __getitem__(self, ix): ...
    def __iter__(self): ...
    def __next__(self): ...

def all_frames(im, func: Incomplete | None = ...): ...