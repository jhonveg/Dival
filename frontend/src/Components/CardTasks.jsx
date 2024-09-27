import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CardTask = ({ task }) => {
  return (
    <React.Fragment>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              {task.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2">
              {task.date}
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default CardTask;
