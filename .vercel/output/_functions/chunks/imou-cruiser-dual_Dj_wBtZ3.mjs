const imouCruiserDual = new Proxy({"src":"/_astro/imou-cruiser-dual.CNp86giU.png","width":299,"height":361,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/imou-cruiser-dual.png";
							}
							
							return target[name];
						}
					});

export { imouCruiserDual as default };
