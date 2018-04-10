

let safeObjects = [
	"self", "onmessage", "postMessage",
	"__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__",
	"constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable",
	"toLocaleString", "toString",
	"eval", "Array", "Boolean", "Date", "Function", "Object", "String", "undefined",
	"Infinity", "isFinite", "isNaN",
	"Math", "NaN", "Number", "parseFloat", "parseInt",
	"RegExp",
	// ...
];

function secure(item, prop) {
	if (safeObjects.indexOf(prop) < 0) {
		const descriptor = Object.getOwnPropertyDescriptor(item, prop);
		if (descriptor && descriptor.configurable) {
			Object.defineProperty(item, prop, {
				get: () => {
					throw new Error(`Security Exception: cannot access ${prop}`);
				},
				configurable: false
			});
		} else {
			if (typeof item.prop === "function") {
				item.prop = () => {
					throw new Error(`Security Exception: cannot access ${prop}`);
				}
			}
			else {
				delete item.prop;
			}
		}
	}
}

[self].forEach((item) => {
	while (item) {
		Object.getOwnPropertyNames(item).forEach(prop => {
			secure(item, prop);
		});

		item = Object.getPrototypeOf(item);
	}
});


console.log('start worker');

const func = {};

self.onmessage = function (e) {
	if (e.data.type == 'create') {
		func[e.data.name] = eval(`(${e.data.code})`);

		postMessage({
			id: e.data.id,
			name: e.data.name,
			status: 'created'
		});
	}
	if (e.data.type == 'run') {
		if (func.hasOwnProperty(e.data.name)) {
			let res = func[e.data.name](e.data.args);

			postMessage({
				id: e.data.id,
				name: e.data.name,
				result: res
			});

		}
		else {
			postMessage({
				id: e.data.id,
				name: e.data.name,
				error: 'function undefined'
			});

		}
	}

};

console.log('end worker');