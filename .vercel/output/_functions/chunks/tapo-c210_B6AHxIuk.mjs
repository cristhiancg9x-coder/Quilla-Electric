const tapoC210 = new Proxy({"src":"/_astro/tapo-c210.DJtBEsq0.png","width":297,"height":384,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/tapo-c210.png";
							}
							
							return target[name];
						}
					});

export { tapoC210 as default };
