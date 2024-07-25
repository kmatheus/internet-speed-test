from flask import Flask, jsonify
import speedtest

app = Flask(__name__)

@app.route('/speedtest', methods=['GET'])
def speedtest_api():
    st = speedtest.Speedtest()
    st.get_best_server()
    
    download_speed = st.download() / 1_000_000  # Convertendo para Mbps
    upload_speed = st.upload() / 1_000_000  # Convertendo para Mbps
    ping = st.results.ping
    
    result = {
        'download_speed': download_speed,
        'upload_speed': upload_speed,
        'ping': ping,
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
