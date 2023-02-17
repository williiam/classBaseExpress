/**
 * Bootstrap your App
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import * as os from "os";
import * as cluster from "cluster";

import App from "./provider/App";
import NativeEvent from "./exception/NativeEvent";

App.loadDatabase();

/**
 * Run the Server on Clusters
 */
App.loadServer();
