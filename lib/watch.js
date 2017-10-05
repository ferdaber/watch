const Dep = {
    target: null
}

function setReactiveProp(target, propName, value, isDebug) {
    let _value = value
    const deps = new Set()

    Object.defineProperty(target, propName, {
        configurable: true,
        enumerable: true,

        get() {
            if (Dep.target && !deps.has(Dep.target)) {
                isDebug && console.info(`${propName} adding ${Dep.target.propName} as a dependency`)
                deps.add(Dep.target)
            }
            return _value
        },
        set(val) {
            _value = val
            deps.forEach(({ notifyHandler }) => notifyHandler(propName))
        }
    })
}

function setComputed(target, propName, getterFunc, isDebug) {
    let _value

    const notifyHandler = reactivePropName => {
        isDebug && console.info(`${propName} recomputing because of ${reactivePropName}`)
        compute()
    }
    const depTarget = {
        propName,
        notifyHandler
    }
    const compute = () => {
        Dep.target = depTarget
        _value = getterFunc()
        Dep.target = null
    }
    compute()

    Object.defineProperty(target, propName, {
        configurable: true,
        enumerable: true,

        get: () => _value
    })
}

function watch({ props, computed }, isDebug) {
    const combinedProps = {}

    for (propName in props) {
        setReactiveProp(combinedProps, propName, props[propName], isDebug)
    }

    for (computedName in computed) {
        if (props[computedName]) {
            console.warn(`A property with name ${computedName} exists, a computed prop will not be created`)
        } else {
            setComputed(combinedProps, computedName, computed[computedName].bind(combinedProps), isDebug)
        }
    }

    return combinedProps
}

module.exports = watch