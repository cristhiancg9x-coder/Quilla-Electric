const imouRangerDual = new Proxy({"src":"/_astro/imou-ranger-dual.DxCE_tkV.png","width":239,"height":336,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/imou-ranger-dual.png";
							}
							
							return target[name];
						}
					});

export { imouRangerDual as default };
