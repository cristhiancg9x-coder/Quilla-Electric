const h7cDual = new Proxy({"src":"/_astro/h7c-dual.BQoM5yWV.png","width":320,"height":435,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/h7c-dual.png";
							}
							
							return target[name];
						}
					});

export { h7cDual as default };
