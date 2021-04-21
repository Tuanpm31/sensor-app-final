export function formatData(type: string, data: string) {
  switch (type) {
    case "temperature":
      return data + "°C"
    case "humidity":
      return data + "%"
    case "dust":
      return data + "µg/m³"
    default:
      return data + "°C"
  }
}