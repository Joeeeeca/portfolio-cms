onBeforeServe((e) => {
    e.router.use((c, next) => {
        c.header("Access-Control-Allow-Origin", "*");
        c.header("Access-Control-Allow-Headers", "*");
        c.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

        if (c.req.method === "OPTIONS") {
            return c.json(200, {});
        }

        return next();
    });
});
