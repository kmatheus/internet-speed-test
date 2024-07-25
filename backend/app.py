from flask import Flask, jsonify
import speedtest

app = Flask(__name__)

@app.route('/speedtest', methods=['GET'])
def speed_test():
    try:
        st = speedtest.Speedtest()
        st.download()
        st.upload()
        st.get_best_server()
        results = {
            'download_speed': st.results.download / 1_000_000,  # Mbps
            'upload_speed': st.results.upload / 1_000_000,  # Mbps
            'ping': st.results.ping  # ms
        }
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
