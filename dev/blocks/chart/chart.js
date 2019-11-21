function makeChart(options = {}) {
  const {
    target = "",
    type = "progress",
    title = "",
    values = []
  } = options;

  const template = {
    data: [],
    appearance: {
      type: "donut",
      gap: 0,
      baseColor: "transparent"
    }
  };

  switch (type) {
    case "pie":
      values.forEach((value) => {
        value.strokeWidth = 8;
        value.color = {
          normal: value.color,
          active: value.color
        };
      });
      template.data = template.data.concat(values);
      template.appearance.title = {
        showSummary: false
      };
      break;

    default:
      values[0].strokeWidth = 2;
      values[0].color = {
        normal: values[0].color ? values[0].color : "#e75735",
        active: values[0].color ? values[0].color : "#e75735"
      };
      template.data = template.data.concat(values[0], {
        value: 100 - values[0].value,
        draw: false
      });
      template.appearance.title = {
        summaryTitle: title,
        showSummary: true
      };
      break;
  }

  return $(target).jChart(template);
}

export default makeChart;
