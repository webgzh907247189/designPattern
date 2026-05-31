Promise.prototype.all = function (...args) {
    if (args.length === 0) return []

    let id = 0
    let result = []
    for (let idx = 0; idx < args.length - 1; idx++) {
        let p1 = args[idx]
        Promise.resolve(p1).then((data) => {
            id++
            result.push(data)
        }, (errData) => {
            return Promise.reject(errData)
        })

        if (id === args.length) {
            return Promise.resolve(result)
        }
    }
}

var s = {
    "class": {
        "Team": "string"
    },
    "perperties": [{
        "name": "name",
        "typeName": "number",
        "decorators": [{
            "expression": "Field",
            "args": [{
                "parameters": ["type"],
                "returnVal": "String"
            }]
        }]
    }, {
        "name": "teamLeader",
        "typeName": "User",
        "decorators": [{
            "expression": "Field",
            "args": [{
                "parameters": ["type"],
                "returnVal": "User"
            }]
        }]
    }, {
        "name": "users",
        "typeName": "User[]",
        "decorators": [{
            "expression": "Field",
            "args": [{
                "parameters": ["type"],
                "returnVal": "User"
            }, {
                "parameters": ["user"],
                "returnVal": "userteam"
            }]
        }]
    }, {
        "name": "createTime",
        "typeName": "LocalDateTime",
        "decorators": [{
            "expression": "Field",
            "args": [{
                "parameters": ["type"],
                "returnVal": "LocalDateTime"
            }]
        }]
    }]
}