/**
 * Watch an object that contains reactive props and computed getter functions
 * The return value is an object with those props and computed properties combined
 * into one object
 * @param target 
 * @param isDebug 
 */
function watch(target: {
    props: object,
    computed: { [key: string]: () => any }
}, isDebug: boolean): object

export default watch