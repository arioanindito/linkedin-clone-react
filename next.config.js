// next.config.js
module.exports = {
	images: {
		domains: ["logos-world.net", "rb.gy"],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};
