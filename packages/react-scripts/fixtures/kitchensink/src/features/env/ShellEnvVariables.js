/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

export default () => (
  <span id="feature-shell-env-variables">
    {process.env.REACT_APP_SHELL_ENV_MESSAGE}.
  </span>
);
