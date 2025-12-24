const h33k = new Proxy({"src":"/_astro/h3-3k.CZy6HE_k.png","width":392,"height":320,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/h3-3k.png";
							}
							
							return target[name];
						}
					});

export { h33k as default };
