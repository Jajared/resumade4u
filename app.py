from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask import send_from_directory
import scraper


app = Flask(__name__, static_folder='app/dist', static_url_path='')

# enable CORS
CORS(app)


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return jsonify({'msg': "Hello World"})


@app.route('/generate', methods=['POST'])
@cross_origin()
def scrape():
    job_tags = request.json['jobTitles']
    scraped_data = scraper.linkedin_scrap.main(job_tags)
    result = scraped_data.to_dict(orient='records')
    return jsonify(result)


# Run the app
if __name__ == '__main__':
    app.run()
