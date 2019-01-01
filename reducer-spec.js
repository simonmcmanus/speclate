// this code now lives in lib/Reducers/index.js



// // experiments

// var breakfast = [
//   {
//     id: 1,
//     title: 'bacon',
//     summary: '2 rashes of bacon'
//   },
//   {
//     id: 2,
//     title: 'cheese',
//     summary: 'four slabs of cheese'
//   }
// ]

// var lunch = [
//   {
//     id: 3,
//     title: 'pizza',
//     summary: '3 pizzas'
//   },
//   {
//     id: 4,
//     title: 'ice cream',
//     summary: '3 cones of ice cream'
//   }
// ]

// const Reducer = (datas, options) => {
//   this.sources = datas
//   this.combined = [].concat.apply(true, datas).slice(1)
//   this.options = options

//   if (typeof this.options.sort === 'function') {
//     this.combined = this.options.sort(this.options)
//   }

//   this.get = () => {
//     var out = this.combined

//     options.filters.forEach((filter) => {
//       out = out.filter(filter)
//     })
//     options.maps.forEach((map) => {
//       out = out.map(map)
//     })
//     return out
//   }
//   this.groupBy = (field) => {
//     if (typeof field === 'function') {
//       //
//     }
//   }
//   return this
// }

// var food = Reducer([breakfast, lunch], {
//   maps: [
//     (item) => ({
//       title: item.title
//     })
//   ],
//   selectors: (item) => ({
//     '.title': item.title
//   }),
//   filters: [
//     (item) => item.title !== 'pizza',
//     (item) => item.title !== 'cheese'
//   ]
// })

// Reducer([breakfast, lunch], {
//   maps: [
//     (item) => ({
//       title: item.title
//     })
//   ],
//   selectors: (item) => ({
//     '.title': item.title
//   }),
//   filters: [
//     (item) => item.title !== 'pizza',
//     (item) => item.title !== 'cheese'
//   ]
// })

// // var posts = Reducer([breakfast, lunch], {
// //   maps: {
// //     summary: (post) => ({
// //       title: post.title
// //     }),
// //     post: (post) => ({

// //     })
// //   },
// //   selectors: (item) => ({
// //     '.title': item.title,
// //     '.summary': item.summary
// //   }),
// //   filters: [
// //     (item) => item.title !== 'pizza',
// //     (item) => item.title !== 'cheese'
// //   ]
// // })

// console.log(food.get())
