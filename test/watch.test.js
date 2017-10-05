const watch = require('../lib/watch')

const debug = false

describe('Watch', () => {
    const dataFactory = () => ({
        props: {
            a: 'a',
            b: 'b'
        },
        computed: {
            c() {
                return this.a + this.b
            }
        }
    })

    let data = dataFactory()

    beforeEach(() => {
        data = dataFactory()
        console.info('--- BEGIN TEST ---')
    })

    afterEach(() => {
        console.info('--- END TEST ---')
    })

    it('computes correctly', () => {
        const foo = watch(data, debug)
        expect(foo.c).toBe('ab')
    })

    it('recomputes correctly', () => {
        const foo = watch(data, debug)
        foo.a = 'aa'
        expect(foo.c).toBe('aab')
    })

    it('adds new dependencies correctly', () => {
        Object.assign(data.props, { toggle: true })
        Object.assign(data.computed, { d() { return this.toggle ? this.a : this.b } })
        const foo = watch(data, debug)
        foo.toggle = false
        expect(foo.c).toBe('ab')
        expect(foo.d).toBe('b')
    })
})