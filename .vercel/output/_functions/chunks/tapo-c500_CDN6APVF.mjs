const tapoC500 = new Proxy({"src":"/_astro/tapo-c500.BdVmWu47.png","width":369,"height":359,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/tapo-c500.png";
							}
							
							return target[name];
						}
					});

export { tapoC500 as default };
