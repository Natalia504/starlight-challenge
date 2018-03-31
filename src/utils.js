function parseDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    let month = newDate.getMonth();
    const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = arr[month]
    const year = newDate.getFullYear();
    return `${month} ${day}, ${year}`
  }

export default parseDate;