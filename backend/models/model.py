from pydantic import BaseModel
from typing import List


class PlotRequest(BaseModel):
    columns: List[str]
    plot: str
