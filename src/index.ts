/**
 * Bootstrap your App
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import App from "./provider/App";
import NativeEvent from "./exception/NativeEvent";

App.loadDatabase();

/**
 * Run the Server on Clusters
 */
App.loadServer();

export default App;