export function getNextDays(count: number) {
  const result = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0); // remove time

  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);

    let day = d.getDate().toString();
    let month = (d.getMonth() + 1).toString();

    if (Number(day) < 10) {
      day = "0" + day;
    }

    if (Number(month) < 10) {
      month = "0" + month;
    }

    result.push({
      day,
      month,
      year: d.getFullYear().toString(),
    });
  }

  return result;
}
