import app from './app';
// import { deleteFromS3 } from './middlewares/aws.handler';
// import { deleteSubDomain } from './middlewares/cloudflare.handler';

// deleteFromS3('deployka', 'output');
// deleteSubDomain('deployka', 'mls4k7');

const PORT = process.env.PORT || 2024;

app.listen(PORT, () => {
	console.log(`🚀 Server is running on PORT ${PORT}`);
});
