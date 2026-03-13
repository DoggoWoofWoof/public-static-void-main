"""Model evaluation utilities."""

import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def evaluate_model(model, X_test: pd.DataFrame, y_test: pd.Series) -> dict:
    predictions = model.predict(X_test)
    return {
        "r2": round(r2_score(y_test, predictions), 4),
        "mae": round(mean_absolute_error(y_test, predictions), 4),
        "rmse": round(mean_squared_error(y_test, predictions, squared=False), 4),
    }
