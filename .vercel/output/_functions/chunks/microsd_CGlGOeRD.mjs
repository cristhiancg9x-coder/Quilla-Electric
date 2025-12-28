const microsd = new Proxy({"src":"/_astro/microsd.CqVsPwEh.png","width":620,"height":522,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/microsd.png";
							}
							
							return target[name];
						}
					});

export { microsd as default };
