# Go to backend folder
cd Backend || { echo "backend directory not found"; exit 1; }
npm install
npm run start &

# Go to frontend folder
cd ../Frontend || { echo "frontend directory not found"; exit 1; }
npm install
npm run start
