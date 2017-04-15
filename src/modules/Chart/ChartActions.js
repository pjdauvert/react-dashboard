
export const UPDATE_CHART = 'UPDATE_CHART';

export function updateChartAction(chart) {
  return {
    type: UPDATE_CHART,
    chart,
  };
}