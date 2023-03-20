from typing import ClassVar

import numpy as np

from pandas._libs.missing import NAType
from pandas._typing import type_t

from pandas.core.dtypes.base import ExtensionDtype as ExtensionDtype

from .masked import BaseMaskedArray as BaseMaskedArray

class BooleanDtype(ExtensionDtype):
    na_value: ClassVar[NAType]
    @classmethod
    def construct_array_type(cls) -> type_t[BooleanArray]: ...

def coerce_to_array(values, mask=..., copy: bool = ...): ...

class BooleanArray(BaseMaskedArray):
    def __init__(
        self, values: np.ndarray, mask: np.ndarray, copy: bool = ...
    ) -> None: ...
    @property
    def dtype(self): ...
    def __array_ufunc__(self, ufunc, method, *inputs, **kwargs): ...
    def __setitem__(self, key, value) -> None: ...
    def astype(self, dtype, copy: bool = ...): ...
    def any(self, *, skipna: bool = ..., **kwargs): ...
    def all(self, *, skipna: bool = ..., **kwargs): ...
