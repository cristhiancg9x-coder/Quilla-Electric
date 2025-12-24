const litebeam = new Proxy({"src":"/_astro/litebeam.DKwoJ78X.png","width":484,"height":456,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/litebeam.png";
							}
							
							return target[name];
						}
					});

export { litebeam as default };
