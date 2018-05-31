  /**
   * Grouping elements in array by multiple properties
   * @param {array} array - The array to process which has multiple properties
   * @param {function} f - A function indicates what properties should be group together
   * 
   * Example:
   *  If I would like to group the elements with same properties of name and age to form a new array,
   *  just put them in a collection as below. ( e.g. An array consists of [name, age] )
   * 
   * _groupBy(data, function(d){
   *  [d.name, d.age]
   * })
   */

export default function groupByMultiProps(array, fn) {
  let groups = {}
  array.forEach((o) => {
    let group = JSON.stringify(fn(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map((group) => {
    return groups[group]
  })
}

