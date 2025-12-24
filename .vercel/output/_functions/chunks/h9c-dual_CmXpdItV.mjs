const h9cDual = new Proxy({"src":"/_astro/h9c-dual.gEpLwjwE.png","width":322,"height":415,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/h9c-dual.png";
							}
							
							return target[name];
						}
					});

export { h9cDual as default };
