import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'annualMaterialReview', ...(require('E:/Web-master/Web/react/antd-pro/src/models/annualMaterialReview.js').default) });
app.model({ namespace: 'BasicScoreSet', ...(require('E:/Web-master/Web/react/antd-pro/src/models/BasicScoreSet.js').default) });
app.model({ namespace: 'BasicScoringView', ...(require('E:/Web-master/Web/react/antd-pro/src/models/BasicScoringView.js').default) });
app.model({ namespace: 'constructionClassification', ...(require('E:/Web-master/Web/react/antd-pro/src/models/constructionClassification.js').default) });
app.model({ namespace: 'dataMaintenance', ...(require('E:/Web-master/Web/react/antd-pro/src/models/dataMaintenance.js').default) });
app.model({ namespace: 'district', ...(require('E:/Web-master/Web/react/antd-pro/src/models/district.js').default) });
app.model({ namespace: 'EvaluationSpeciesChangeTrendsprotected', ...(require('E:/Web-master/Web/react/antd-pro/src/models/EvaluationSpeciesChangeTrendsprotected.js').default) });
app.model({ namespace: 'examinationTimeSet', ...(require('E:/Web-master/Web/react/antd-pro/src/models/examinationTimeSet.js').default) });
app.model({ namespace: 'global', ...(require('E:/Web-master/Web/react/antd-pro/src/models/global.js').default) });
app.model({ namespace: 'indexClassification', ...(require('E:/Web-master/Web/react/antd-pro/src/models/indexClassification.js').default) });
app.model({ namespace: 'informationMonitoring', ...(require('E:/Web-master/Web/react/antd-pro/src/models/informationMonitoring.js').default) });
app.model({ namespace: 'login', ...(require('E:/Web-master/Web/react/antd-pro/src/models/login.js').default) });
app.model({ namespace: 'mainlyProtectedSpecies', ...(require('E:/Web-master/Web/react/antd-pro/src/models/mainlyProtectedSpecies.js').default) });
app.model({ namespace: 'map', ...(require('E:/Web-master/Web/react/antd-pro/src/models/map.js').default) });
app.model({ namespace: 'menu', ...(require('E:/Web-master/Web/react/antd-pro/src/models/menu.js').default) });
app.model({ namespace: 'modelManagement', ...(require('E:/Web-master/Web/react/antd-pro/src/models/modelManagement.js').default) });
app.model({ namespace: 'ReserveApplicationAcceptance', ...(require('E:/Web-master/Web/react/antd-pro/src/models/ReserveApplicationAcceptance.js').default) });
app.model({ namespace: 'reserveConstruction', ...(require('E:/Web-master/Web/react/antd-pro/src/models/reserveConstruction.js').default) });
app.model({ namespace: 'ReserveMaterialsView', ...(require('E:/Web-master/Web/react/antd-pro/src/models/ReserveMaterialsView.js').default) });
app.model({ namespace: 'ReserveReportableInformation', ...(require('E:/Web-master/Web/react/antd-pro/src/models/ReserveReportableInformation.js').default) });
app.model({ namespace: 'ReserveTheInitial', ...(require('E:/Web-master/Web/react/antd-pro/src/models/ReserveTheInitial.js').default) });
app.model({ namespace: 'setting', ...(require('E:/Web-master/Web/react/antd-pro/src/models/setting.js').default) });
app.model({ namespace: 'spatialAnalysis', ...(require('E:/Web-master/Web/react/antd-pro/src/models/spatialAnalysis.js').default) });
app.model({ namespace: 'ThresholdSet', ...(require('E:/Web-master/Web/react/antd-pro/src/models/ThresholdSet.js').default) });
app.model({ namespace: 'user', ...(require('E:/Web-master/Web/react/antd-pro/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
