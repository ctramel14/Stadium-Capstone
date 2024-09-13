const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

// Get Requests
app.get("/api/stadiums", async (req, res, next) => {
  try {
    const stadiums = await prisma.stadium.findMany({
      include: {
        visitedStadiums: {
          include: {
            user: true,
          },
        },
      },
    });
    res.json(stadiums);
  } catch (err) {
    next(err);
  }
});

app.get("/api/stadiums/:id", async (req, res, next) => {
  const id = +req.params.id;
  try {
    const stadiums = await prisma.stadium.findFirst({
      where: { id },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      }
    });
    res.json(stadiums);
  } catch (err) {
    next(err);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  const id = +req.params.id;
  try {
    const users = await prisma.user.findFirst({
      where: { id },
      // include: {
      //   _count: {
      //     select: { visitedStadiums: true },
      //   },
      // },
      include: {
        visitedStadiums: {
          include: {
            stadium: true,
          },
        },
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});



app.get("/api/reviews", async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany();
    // Check how to get latest 20 reviews
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

app.get("/api/reviews/:id/comments", async (req, res, next) => {
  const id = +req.params.id;
  try {
    const reviews = await prisma.review.findFirst({
      where: { id },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

app.get("/api/comments", async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (err) {
    next(err);
  }
});


app.post("/api/stadiums", async (req, res, next) => {
  try {
    const {
      name,
      teamName,
      capacity,
      openYear,
      division,
      zipCode,
      state,
      imageOutsideURL,
      imageInsideURL,
    } = req.body;
    const newStadium = await prisma.stadium.create({
      data: {
        name,
        teamName,
        capacity,
        openYear,
        division,
        zipCode,
        state,
        imageOutsideURL,
        imageInsideURL,
      },
    });
    res.status(201).json(newStadium);
  } catch (err) {
    next(err);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      administrator = false,
    } = req.body;
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password,
        administrator,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

app.post("/api/users/:id/visitedstadiums", async (req, res, next) => {
  const userId = +req.params.id;
  const { stadiumId } = req.body;
  try {
    // Check if the user and stadium exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const stadium = await prisma.stadium.findUnique({
      where: { id: stadiumId },
    });
    if (!user || !stadium) {
      return res.status(404).json({ error: "User or Stadium not found" });
    }
    // Associate the user with the stadium
    await prisma.visitedStadium.create({
      // where: { id: userId },
      data: {
        userId,
        stadiumId,
      },
    });

    res.status(201).json({ message: "Stadium added to user's list" });
  } catch (err) {
    next(err);
  }
});

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? "Internal server error.";
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
