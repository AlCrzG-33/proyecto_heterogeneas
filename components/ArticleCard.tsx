import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ArticleCard({ title, description, imageUrl }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', m: 2, p: 2 }}>
      <CardMedia
        sx={{ minWidth: 140 }}
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}